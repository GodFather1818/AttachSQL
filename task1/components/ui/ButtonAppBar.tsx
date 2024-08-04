"use client"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import * as SheetPrimitive from "@radix-ui/react-dialog"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet"
import Link from 'next/link';

export default function ButtonAppBar() {
  const category = () => {
    console.log("Hello")
  }
  const products = () => {
    console.log("Products clicked");
  }
  const projects = () => {
    console.log("Projects clicked");
  }
  const tasks = () => {
    console.log("Tasks clicked");
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Sheet>
              <SheetTrigger><MenuIcon /></SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Features</SheetTitle>
                  <SheetDescription>
                    <div className="btn-class text-primary">
                      <SheetClose asChild>
                        <Link href="/category">
                          <Button onClick={category}>Category</Button>
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link href="/products">
                          <Button onClick={products}>Products</Button>
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link href="/projects">
                          <Button onClick={projects}>Projects</Button>
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>

                        <Link href="/tasks">
                          <Button onClick={tasks}>Tasks</Button>
                        </Link>
                      </SheetClose>
                    </div>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/">
              Task
            </Link>
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
