import {useState} from 'react'

function Home() {

  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div>
      <div>Smart Parks (Project Title)</div>
      <img 
        src = 'https://images.unsplash.com/photo-1514373941175-0a141072bbc8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80' 
        alt = 'Dog Playing with Ball'/>
      <button 
        type='button'
        onClick ={()=>{setIsModalOpen(true)}}
      >
        Check In!
      </button>
      
    </div>
  )
}

export default Home