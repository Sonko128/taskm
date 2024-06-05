import Layout from "../../Layout";

function Submitted(){
    return(
        <Layout children={<Show_Submit/>}/>
    )
}
export default Submitted;

function Show_Submit(){
    return(
        <h1>Student who submitted work yet</h1>
    )
}