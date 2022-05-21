import { useState } from "react";
import { Container } from "react-bootstrap";
import MainForm from "./components/MainForm";
import Tags from "./components/Tags";

function App() {
  const [tags, setTags] = useState([]);
  return (
    <Container>
      <h1>Image detection</h1>
      <Container>
        <MainForm setTags={setTags} />
        {tags.length > 0 && <Tags tags={tags} />}
      </Container>
    </Container>
  );
}

export default App;
