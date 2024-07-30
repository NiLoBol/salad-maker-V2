Salad Maker เป็นเว็บไซต์สำหรับจัดทำสลัด

# เริ่มต้น

รันโค้ดลงบน CMD

```bash
yarn install

yarn run dev

```

เปิดเว็บไซต์ที่ [http://localhost:3000](http://localhost:3000)

# คำอธิบายเว็บไซต์

เว็บไซต์นี้ แบ่งเป็น 2 ส่วนคือ api กับ หน้าเว็บ

## api
### เป็น api ที่มี 2 endpoint คือ Recipe กับ salad
#### Recipe จะมีการใช้ GET POST DELETE PATCH
#####        GET : ส่งออกข้อมูลที่อยู่ใน recipes.json

        POST (data:DATAT[](ประเภทของข้อมูลที่เก็บใน recipes.json))

            :ทำการเขียนทับค่าลงใน recipes.json (บนหน้าเว็บจะส่ง array เป็นก้อนมา)

        DELETE (index:number)

            :ทำการลบข้อมูลใน recipes.json โดยลบตำแหน่งที่ตรงกับindex

        PATCH (index:number ,newdata:DATAT)

            :ทำการอัปเดตตำแหน่งที่ตรงกับindex โดยเขียน newdata ลงไปแทนที่ข้อมูลเก่า

#### salad จะมีการใช้ POST

        POST ({checkVegetables,checkFruit,checkToppings,checkProtein,checkDressing}:boolean ทั้งหมด)

            :เช็คค่าข้อมูลว่าได้เลือกผลไม้อะไรบ้าง โดยจะดึงข้อมูลจาก data.json 

            ถ้า {checkVegetables,checkFruit,checkToppings,checkProtein,checkDressing}เป็น false ทั้งหมด หรือ 

            ประเภทของวัตถุดิบตรงกัน แล้วส่งค่ากลับไปหน้าเว็บ

## หน้าเว็บ

#### หน้าเว็บจะแบ่งออกเป็น รูปภาพ หน้าหลัก และ หน้าที่ใช้ส่งข้อมูล
    รูปภาพ   จะอยู่ในโฟลเดอร์ Icon เก็บ iconภายในเว็บไซต์ที่เป็น .svg 
            จะอยู่ในโฟลเดอร์ public เก็บรูปภาพที่เป็น .png ทั้งหมด
    หน้าที่ใช้ส่งข้อมูล CategoryProvider.tsx จะเก็บข้อมูลผ่าน useContext โดยมีข้อมูลดังนี้
            ingredients, setIngredients เป็น useState เก็บข้อมูลของวัตถุดิบดึงจาก salad:POST
            checkVegetables, setCheckVegetables เป็น useState เก็บข้อมูลวัตถุดิบที่ถูกเลือกโดยจะเก็บค่า Vegetables
            checkFruit, setCheckFruit เป็น useState เก็บข้อมูลวัตถุดิบที่ถูกเลือกโดยจะเก็บค่า Fruit
            checkToppings, setCheckToppings เป็น useState เก็บข้อมูลวัตถุดิบที่ถูกเลือกโดยจะเก็บค่า Toppings
            checkProtein, setCheckProtein เป็น useState เก็บข้อมูลวัตถุดิบที่ถูกเลือกโดยจะเก็บค่า Protein
            checkDressing, setCheckDressing เป็น useState เก็บข้อมูลวัตถุดิบที่ถูกเลือกโดยจะเก็บค่า Dressing 
            Repect, setRepect เป็น useState เป็นค่าว่างไว้เก็บข้อมูลวัตถุดิบและจำนวนของวัตถุดิบที่ถูกเลือก
            CreateRecipe, setCreateRecipe เป็น useState เป็นboolean ไว้แสดง popup  
                    โดยใช้แสดงในตอนที่ CreateRecipe และตอน DeleteRecipe
            data, setdata เป็น useState เก็บข้อมูลสูตรอาหารโดยดึงจาก Recipe:GET
    หน้าหลัก  แบ่งเป็น2ส่วนคือ ส่วนที่ไม่เปลี่ยนกับส่วนที่เปลี่ยน
                ข้อมูล Listselect, setListselect เป็น useState เก็บข้อมูลว่าเว็บไซต์อยู่ในส่วนของ Salad maker หรือ Recipe
            ส่วนที่ไม่เปลี่ยน เป็นส่วน navbarด้านซ้ายของเว็บไซต์ มีปุ่ม Salad maker , Recipeโดยเมื่อกดจะ setListselect 
            ส่วนที่เปลี่ยน 
                เมื่อ Listselect เป็น Salad maker จะแสดงหน้า Salad maker
                    SaladMakerPage :  เป็นส่วนที่แสดงข้อมูลสลัดและเลือกสลัด
                        Category เก็บข้อมูล {checkVegetables,checkFruit,checkToppings,checkProtein,checkDressing}
                        SaladList แสดงสลัดตามรายการที่เลือก โดยดึงข้อมูลจาก ingredients
                    Footer : เป็นส่วนfixedbarด้านล่าง ใช้เก็บข้อมูลวัตถุดิบและส่งไปที่ Recipe:POST
                        ใช้Repect, setRepect เก็บข้อมูลวัตุดิบและเมื่อกดปุ่ม Create New Recipe
                เมื่อ Listselect เป็น Recipe จะแสดงหน้า Recipe
                    RecipePage: แสดงสูตรอาหารทั้งหมด โดยดึงข้อมูลจาก data 
                        edit, setedit เป็น useState จะเก็บค่า -1 และเมื่อเปลี่ยนจะเปลี่ยนไปเป็นหน้า EditPage
                        indexdelete, setindexdelete เป็น useState<number>(-1);
                        และเมื่อกดdelete จะแสดงpopup ยืนยันการลบเมื่อกดจะมีการ setdata(ลบindexที่กดลบ)
                        ใหม่และทำการ Recipe:POST
                        เมื่อกด Edit จะแสดงหน้า EditPage โดยจะเอาข้อมูล edit มาใช้เพื่อดูสตรนั้นๆ
                    EditPage: 
                        newData, setnewData เป็น useState ดึงข้อมูล data ในตำแหน่ง editมาแสดง 
                        เมื่อกดปุ่ม เพิ่ม ลด ลบ จะเปลี่ยนข้อมูลโดยใช้ setnewData 
                        และเมื่อกด Update Recipeจะส่ง Recipe:PATCH อัปเดตข้อมูลและกลับไปหน้าRecipePage
                        ถ้าลบข้อมูลทั้งหมดแล้วทำการกด Update Recipe จะลบข้อมูลสูตรนั้นไปเลย


