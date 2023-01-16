import { Footer } from "../layoutComponents/Footer";
import { Header } from "../layoutComponents/Header";

export function NotFound() {
  return (
    <>
      <Header></Header>
      <main className="not-found">
        <div className="not-found--section">
          <h2>404</h2>
          <h2>No art in sight</h2>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
}
