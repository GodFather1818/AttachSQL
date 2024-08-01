"use client"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
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
    const category = ()=>{
        window.location.href = '/category'
        SheetClose
    }
    const products = ()=>{
        window.location.href = '/products'
        SheetClose
    }
    const projects = ()=>{
        window.location.href = '/projects'
        SheetClose
    }
    const tasks = ()=>{
        window.location.href = '/tasks'
        SheetClose
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
        <div className="btn-class">
        <Button onClick={category}>Category</Button>
        <Button onClick={products}>Products</Button>
        <Button onClick={projects}>Projects</Button>
        <Button onClick={tasks}>Tasks</Button>
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
