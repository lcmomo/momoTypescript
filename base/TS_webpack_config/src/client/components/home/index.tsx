import  React,{ Suspense } from 'react';


import { useFetch } from 'react-hooks-fetch'
// const { Suspense } = React;

const DisplayRemoteData = () => {
    const { error, data } = useFetch("/api/getHello")
    if (error) return <span>Error:  {error.message }</span>;
    if (!data) return null;
    return <span>RemoteData: { data.data }</span>
}
const Home = () => (
    <Suspense fallback={ <span> Loading...</span>} >
        <DisplayRemoteData />
    </Suspense>
)

// const Home = () => {
//     return (<span>Home</span>)
// }


export default Home;