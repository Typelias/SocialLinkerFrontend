import type { NextPage } from "next";
import { useEffect, useState } from "react";


const SvanPage: NextPage = () => {

    const [url, setUrl] = useState<string>();

    async function getData() {
        const resp = await fetch("http://api.sr.se/api/v2/channels/132?format=json")
        const data = await resp.json()
        console.log(data)

        setUrl(data.channel.liveaudio.url)
    }
    useEffect(() => {
        getData()
    }, [])



    return (
        <div>
            <h1>Hello</h1>
            {url == null || url.length == 0 ?
                <h1>No audio</h1> :
                <audio controls autoPlay>
                    <source src={url} />
                </audio>
            }
        </div>
    )
}


export default SvanPage