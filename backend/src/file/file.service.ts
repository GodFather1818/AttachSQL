import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as pdfParse from 'pdf-parse';
import * as officegen from 'officegen';
import * as path from 'path';
import * as fs from 'fs';
import * as util from 'util';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';
import * as PptxGenJS from 'pptxgenjs';
import * as pptxParser from 'pptx-parser';
import * as officeParser from 'officeparser';



@Injectable()
export class FileService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(private prisma: PrismaService, private configService: ConfigService) {
    const apiKey = configService.get<string>('GOOGLE_API_KEY');
    // console.log(`The API KEY IS: ${apiKey}`);
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }

  async processFile(file: Express.Multer.File, attachmentId: number): Promise<void> {
    try {
      const { extractedText } = await this.extractTextFromFile(file);
      const summary = await this.generateSummary(extractedText);

      await this.prisma.file.create({
        data: {
          extractedText,
          summaryGenerated: summary,
          attachmentId,
        },
      });
    } catch (error) {
      console.error('Error in processFile:', error);
      throw new Error(`Failed to process file: ${error.message}`);
    }
  }

  async extractTextFromFile(file: Express.Multer.File): Promise<{ extractedText: string }> {
    try {
      let extractedText = '';

      if (file.mimetype === 'application/pdf') {
        extractedText = await this.extractTextFromPdf(file.buffer);
      } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
        extractedText = await this.extractTextFromPptx(file.buffer);
      } else {
        throw new Error('Unsupported file type');
      }
      console.log('Extracted text length:', extractedText.length);
      return { extractedText };
    } catch (error) {
      console.error('Error in extractTextFromFile:', error);
      throw new Error(`Failed to extract text: ${error.message}`);
    }
  }

  private async extractTextFromPdf(buffer: Buffer): Promise<string> {
    try {
      
      const data = await pdfParse(buffer);
      console.log(data.text.trim());
      return data.text.trim();
    } catch (error) {
      throw new Error(`Failed to extract text from PDF: ${error.message}`);
    }
  }


  // private async extractTextFromPptx(buffer: Buffer): Promise<string> {
  //   const tempFilePath = path.join(__dirname, '..', '..', 'temp', `temp_${Date.now()}.pptx`);
  //   await util.promisify(fs.writeFile)(tempFilePath, buffer);

  //   try {
  //     const pptx = officegen('pptx');
      
  //     const fileContent = await util.promisify(fs.readFile)(tempFilePath);
      
      
  //     await new Promise<void>((resolve, reject) => {
  //       pptx.parse(fileContent, (err) => {
  //         if (err) reject(err);
  //         else resolve();
  //       });
  //     });

  //     let extractedText = '';
  //     pptx.getSlides().forEach((slide) => {
  //       slide.forEach((object) => {
  //         if (object.options && object.options.text) {
  //           extractedText += object.options.text + '\n';
  //         }
  //       });
  //     });
  //     console.log(extractedText.trim())
  //     return extractedText.trim();
  //   } finally {
  //     await util.promisify(fs.unlink)(tempFilePath);
  //   }
  // }
  
  private async extractTextFromPptx(buffer: Buffer): Promise<string> {
    try {
      // Create a temporary file path
      const tempFilePath = path.join(__dirname, '..', '..', 'temp', `temp_${Date.now()}.pptx`);
      
      // Write the buffer to a temporary file
      await util.promisify(fs.writeFile)(tempFilePath, buffer);
  
      // Configure the parser
      const config: officeParser.OfficeParserConfig = {
        newlineDelimiter: " ",  // Separate new lines with a space
        ignoreNotes: true       // Ignore notes in the presentation
      };
  
      // Parse the PPTX file
      const extractedText = await officeParser.parseOfficeAsync(tempFilePath, config);
  
      // Clean up the temporary file
      await util.promisify(fs.unlink)(tempFilePath);
      console.log(extractedText.trim())
      return extractedText.trim();
    } catch (error) {
      console.error('Error in extractTextFromPptx:', error);
      throw new Error(`Failed to extract text from PPTX: ${error.message}`);
    }
  }

  private async generateSummary(text: string): Promise<string> {
    try {
      const generationConfig = {
        temperature: 0.7,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
      };

      const chatSession = this.model.startChat({ generationConfig });
      const result = await chatSession.sendMessage(`Please summarize the following text:\n\n${text}`);
      console.log(result.response.text())
      return result.response.text();
    } catch (error) {
      console.error('Error generating summary:', error);
      throw new Error(`Failed to generate summary: ${error.message}`);
    }
  }
}