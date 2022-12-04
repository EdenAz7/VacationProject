import "./PageNotFound.css";

function PageNotFound(): JSX.Element {
    return (
        <div className="PageNotFound">
			<h1>This page is not found :(</h1>
            <img src="https://cdn.pixabay.com/photo/2021/07/21/12/49/error-6482984_960_720.png" alt="404PageNotFound" width={500}/>
        </div>
    );
}

export default PageNotFound;
