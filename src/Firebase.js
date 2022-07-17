import { useState, useEffect } from "react"
import {db} from './firebase-config'
import { addDoc, collection, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore"
import { async } from "@firebase/util"
import "./App.css"
const Firebase = ({user, userInfo, isCompany}) => {
    const [newTask, setTask] = useState("")
    const [newDate, setDate] = useState("")
    const [data, setData] = useState([])
    const [newLink, setLink] = useState("")
    const dataCollectionRef = collection(db, "tasks")

    const createTask = async () => {
        if(newTask === "" || newDate === "")
        {
            console.log("No Empty fields!")
        }
        else
        {
            await addDoc(dataCollectionRef, { company: userInfo.name, task: newTask, due: newDate, accept: false, link: "", student: ""})
            window.location.reload();
        }
    };

    const uploadTask = async (id, newLink) => {
        if(newLink !== "")
        {
            const userDocs = doc(db, "tasks", id)
            const newFields = {link: newLink}
            await updateDoc(userDocs, newFields)
            setLink("")
            window.location.reload()
        }
    }

    const acceptTask = async (id) => {
        const userDocs = doc(db, "tasks", id);
        const newFields = {student: userInfo.name, accept: true}
        await updateDoc(userDocs, newFields)
        window.location.reload()
    }

    const giveUpTask = async (id) => {
        const userDocs = doc(db, "tasks", id);
        const newFields = {student: "", accept: false}
        await updateDoc(userDocs, newFields)
        window.location.reload()
    }

    const deleteTask = async (id) => {
        const userDoc = doc(db, "tasks", id);
        await deleteDoc(userDoc)
        window.location.reload()
    }

    useEffect(() => {
        const getData = async () => {
            const info = await getDocs(dataCollectionRef);
            setData(info.docs.map((doc) => ({...doc.data(), id: doc.id })))
        };
        getData();
    }, []);


    return (
        <section className = "firebase">
            <section className = "test">
                {userInfo && userInfo.company ? (
                    <>
                        <input placeholder = "Task..." onChange = {(e) => {setTask(e.target.value)}}></input>
                        <input type = "date" placeholder = "Due date..." onChange = {(e)=>{setDate(e.target.value)}}></input>
                        <button className = "create" onClick = {createTask}>Add Task</button>
                    </>
                ) : (
                    <>
                    </>
                )}
            </section>
            <table class = "table">
                <thead>
                    <tr>
                        <th scope="col">Company</th>
                        <th scope="col">Task</th>
                        <th scope="col">Due Date</th>
                        <th scope="col">Current Student</th>
                        <th scope="col">Upload</th>
                        <th scope="col">Submission</th>
                        <th scope="col">Remove Task</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((info) => {
                        return (
                            <tr>
                                <td>{info.company}</td>
                                <td class = "cell-breakWord">{info.task}</td>
                                <td>{info.due}</td>
                                {userInfo && info.accept ? (
                                    <td>{info.student}</td>
                                ) : (
                                    <>
                                        {userInfo && !userInfo.company ? (
                                            <button onClick={() => {acceptTask(info.id)}}>Click to claim task</button>
                                        ) : (
                                            <>
                                                <td></td>
                                            </>
                                        )}
                                    </>
                                )}
                                {userInfo && info.student === userInfo.name && !info.link ? (
                                    <div>
                                    <input className = "submitbox" placeholder = "Paste submit link..." onChange = {(event) => {setLink(event.target.value)}}></input>
                                    <button className = "submit" onClick = {() => uploadTask(info.id, newLink)}>Submit</button>
                                    </div>
                                ) : (
                                    <td></td>
                                )}
                                 {info.link ? (
                                    <div>
                                        <td><a href = {info.link}><span>Link</span></a></td>
                                    </div>
                                ) : (
                                    <td></td>
                                )}
                                {userInfo && info.company.toLowerCase() === userInfo.name.toLowerCase() ? (
                                    
                                    <td><button className = "delete" onClick = {() => {deleteTask(info.id)}}>Delete</button></td>
                                ) : (
                                    <>
                                        {userInfo && info.student == userInfo.name && !info.link ?  ( 
                                            <>
                                                <td><button className = "remove" onClick = {() => {giveUpTask(info.id)}}>Free task</button></td>
                                            </>
                                        ) : (
                                            <>
                                                <td></td>
                                            </>
                                        )}
                                    </>
                                )}
                                    </tr>
                            )
                    })}
                </tbody>
            </table>
        </section>
    )


}

export default Firebase