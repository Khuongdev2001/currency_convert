import Card from "../components/Card"
export default function Main() {
    return (
        <div id="wrapper">
            <div className="box-container d-flex align-items-center justify-center">
                <div className="container">
                    <h2 className="main-text">
                        Build Currency Converter
                    </h2>
                    <main className="d-flex justify-between align-items-center">
                        <div className="box-thumbnail">
                            <img src="logo192.png" className="thumbnail" alt="logo react" />
                        </div>
                        <Card />
                    </main>
                    <h2 className="main-text">
                        With React JS
                    </h2>
                </div>
            </div>
        </div>
    )
}