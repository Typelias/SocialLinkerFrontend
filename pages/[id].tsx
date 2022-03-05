import type { NextPage } from 'next';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';


interface SiteData {
    username: String;
    site: String;
}


const CardPage: NextPage = () => {
    const router = useRouter()
    const [user, setUser] = useState<string>();
    const [userData, setUserData] = useState<Array<SiteData>>();

    useEffect(() => {
        if (!router.isReady) {
            return;
        }
        setUser(router.query["id"] as string)


    }, [router.isReady])

    async function getUserData(username: string) {
        const res = await fetch("http://localhost:8080/user/" + username)
        const data = await res.json() as Array<SiteData>
        console.log(data);
        setUserData(data);
    }

    useEffect(() => {
        if (!user) {
            return;
        }

        getUserData(user)

    }, [user])

    return (<div>
        {
            userData == undefined || userData == null ? <h1>Loading</h1> :
                <div>
                    {
                        userData.map(d => {
                            return (
                                <div>
                                    <h3>{d.site}</h3>
                                    <p>{d.username}</p>
                                </div>
                            )

                        })
                    }
                </div>
        }
    </div>);
}

export default CardPage;