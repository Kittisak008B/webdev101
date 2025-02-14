const BASE_URL = 'http://localhost:8000'

window.onload = async () => {
  await loadData()
}

const loadData = async () => {
  const response = await axios.get(`${BASE_URL}/users`) //get all users
  const users = response.data

  //ประกอบ HTML จาก user data โดยใช้ <li> และ สร้างปุ่มสำหรับ Edit และ Delete
  let userHTMLData = '<ul>'
  for (let i = 0; i < users.length; i++) {
    userHTMLData += `<li>
      ${users[i].id} ${users[i].firstname} ${users[i].lastname} ${users[i].age} ${users[i].gender} 
      <a href='index.html?id=${users[i].id}'> <button data-id='${users[i].id}'>Edit</button> </a>
      <button class='delete' data-id='${users[i].id}'>Delete</button>
    </li>`
  }
  userHTMLData += '</ul>'

  //นำ html ที่ประกอบใส่กลับเข้าไปใน DOM html
  let usersDOM = document.getElementById('users')
  usersDOM.innerHTML = userHTMLData

  //ทำการดึง button class=delete ที่ติดกับทุก DOM ที่สร้างใหม่มา
  let deleteDOMs = document.getElementsByClassName('delete')

  for (let i = 0; i < deleteDOMs.length; i++) {  //วนลูปไปยังทุก DOM และเพิ่ม click event
    deleteDOMs[i].addEventListener('click', async (event) => {
      let id = event.target.dataset.id  //ดึงค่า id ที่ฝังไว้กับ data-id เพื่อใช้สำหรับ reference กลับไปยังฝั่ง Backend
      try {
        await axios.delete(`${BASE_URL}/users/${id}`) //delete a specific user by id
        loadData() //recursive
      } catch (error) {
        console.log('error', error)
      }
    })
  }
}