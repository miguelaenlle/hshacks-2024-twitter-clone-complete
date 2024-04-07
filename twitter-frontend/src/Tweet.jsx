import { useEffect, useState } from "react"

const Tweet = (
    props
) => {
    const placeholderPFP = "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"

    const [editing, setEditing] = useState(false);

    const [yourName, setYourName] = useState("");
    const [content, setContent] = useState("");

    const handleResetInputs = () => {
        setYourName("");
        setContent("");
    }

    useEffect(() => {
        setYourName(props.sender);
        setContent(props.content);
    }, [props])


    const handleSaveData = async () => {
        const response = await fetch(`http://localhost:4000/tweets/${props._id}`, {
            method: "PUT",
            body: JSON.stringify({
                sender: yourName,
                content
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

        await response.json()
        setEditing(false)
        handleResetInputs();
        props.handleReload()
    }

    if (editing) {
        return (
            <div className="container">
                <input
                    type="text"
                    placeholder="Your Name"
                    value={yourName}
                    onChange={(e) => setYourName(e.target.value)}
                />
                <textarea
                    type="text"
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button
                    onClick={handleSaveData}
                >
                    Save Edits
                </button>
            </div>
        )
    }


    return (
        <div className="container tweet">
            <div className="messageHeader">
                <img className="pfp" src={props.senderPFP || placeholderPFP} alt="Profile" />
                <h3>{props.sender}</h3>
            </div>
            <p>{props.content}</p>
            {props.imageUrl && (
                <img src={props.imageUrl} alt="Content" />
            )}
            <br />
            <p className="textButton" onClick={() => {
                setEditing(true)
            }}>Edit</p>
            <p className="textButton" onClick={() => {
                alert("Are you sure you want to delete this tweet?")
                props.handleDeleteTweet(props._id)
            }}>Delete</p>
        </div>
    )
}

export default Tweet