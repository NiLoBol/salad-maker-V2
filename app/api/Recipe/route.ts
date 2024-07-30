
import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import { DATAT } from '../../Type';

export async function GET() {
  const jsonDirectory = path.join(process.cwd(), 'data');
  const fileContents = await fs.readFile(path.join(jsonDirectory,  'recipes.json'), 'utf8');
  return NextResponse.json(JSON.parse(fileContents));
}

export async function POST(request: Request) {
  try {
    const data: DATAT[] = await request.json();
    
    const dataToWrite = JSON.stringify(data);
    const filePath = path.join(process.cwd(), 'data', 'recipes.json');

    await fs.mkdir(path.dirname(filePath), { recursive: true });

    await fs.writeFile(filePath, dataToWrite, 'utf8');

    return NextResponse.json({ message: 'Item added successfully',item: data }, { status: 201 });
  } catch (error) {
    console.error('Error writing file:', error);
    return NextResponse.json({ message: 'Error adding item' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
    try {
      const { index }: { index: number } = await request.json();
      const jsonDirectory = path.join(process.cwd(), 'data');
      const filePath = path.join(jsonDirectory, 'recipes.json');
  
      const fileContents = await fs.readFile(filePath, 'utf8');
      const data = JSON.parse(fileContents);
  
      if (index >= 0 && index < data.length) {
        data.splice(index, 1);
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
        return NextResponse.json({ message: "Recipe deleted successfully" }, { status: 200 });
      } else {
        return NextResponse.json({ message: "Invalid index" }, { status: 400 });
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
      return NextResponse.json({ message: 'Error deleting recipe' }, { status: 500 });
    }
  }

  export async function PATCH(request: Request) {
    try {
      const { index, newdata } :{index:number, newdata:DATAT} = await request.json();
      const jsonDirectory = path.join(process.cwd(), 'data');
      const filePath = path.join(jsonDirectory, 'recipes.json');
  
      const fileContents = await fs.readFile(filePath, 'utf8');
      const data:DATAT[] = JSON.parse(fileContents);
  
      if (index >= 0 && index < data.length) {
        data[index] = newdata;
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
        return NextResponse.json({ message: "Recipe updated successfully",  data}, { status: 200 });
      } else {
        return NextResponse.json({ message: "Invalid index" }, { status: 400 });
      }
    } catch (error) {
      console.error('Error updating recipe:', error);
      return NextResponse.json({ message: 'Error updating recipe' }, { status: 500 });
    }
  }