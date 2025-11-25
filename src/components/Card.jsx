import React, { useEffect, useState } from 'react'

export default function Card() {
    const [username, setUsername] = useState("")
    const [triger, setTriger] = useState(0)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({})
    useEffect(() => {
        async function Fetch(username) {
            setLoading(true)
            try {
                const res = await fetch(`https://api.github.com/users/${username}`)
                const data = await res.json()
                setData(data)
            } catch (e) {
                console.error("Error Fetching the user,", e);
                setData({})
            }
            setLoading(false)
        }
        if (username) Fetch(username)
    }, [triger])


    return (
        <div className='relative flex justify-center items-center w-full h-[100vh] flex-col gap-[10rem]'>
            {data && data.login && (

                <div className="w-[25%] rounded-2xl 
  bg-[linear-gradient(315deg,#d9d9d9,#f8f8f8)]
  shadow-[20px_20px_40px_#bebebe,-20px_-20px_40px_#ffffff]
  p-6 text-center flex justify-center items-center flex-col gap-2">
                    {loading ? (
                        <p className="text-xl text-gray-500">Loading...</p>
                    ) : (
                        <>
                            <img src={data.avatar_url} alt={data.name} className='rounded-[50%] w-[10rem]' />
                            <div>
                                <h1 className='text-2xl'>{data.name}</h1>
                                <h2 className='text-gray-400 text-xl'>{data.login}</h2>
                            </div>
                            <div className='flex justify-around w-full'>
                                <div>
                                    <p>{data.followers}</p>
                                    <p className='text-gray-500 text-xl'>followers</p>
                                </div>
                                <div>
                                    <p>{data.following}</p>
                                    <p className='text-gray-500 text-xl'>following</p>
                                </div>
                                <div>
                                    <p>{data.public_repos}</p>
                                    <p className='text-gray-500 text-xl'>Public Repos</p>
                                </div>
                            </div>
                            <div>
                                <p className='mt-3'>{data.bio}</p>
                            </div>
                            <div id="links" className="flex flex-col gap-2">
                                {data.email && (
                                    <a href={`mailto:${data.email}`} className="text-blue-600 underline">
                                        @email: {data.email}
                                    </a>
                                )}

                                {data.blog && (
                                    <a
                                        href={data.blog.startsWith('http') ? data.blog : `https://${data.blog}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline"
                                    >
                                        @portfolio: {data.blog}
                                    </a>
                                )}
                            </div>
                        </>
                    )}

                </div>
            )}
            <Input className="absolute " setUsername={setUsername} setTriger={setTriger} />

        </div>
    )
}

function Input({ setUsername, setTriger }) {
    const [input, setInput] = useState("")
    return <div>
        <input className="p-3 rounded-lg border border-gray-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400 transition" type="text" placeholder='Enter Your Github Usename' onChange={(e) => setInput(e.target.value)} />
        <button className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-md hover:scale-105 transform transition" onClick={() => {
            setUsername(input)
            setTriger(prev => prev + 1)
        }}>Fetch User</button>
    </div>
}
