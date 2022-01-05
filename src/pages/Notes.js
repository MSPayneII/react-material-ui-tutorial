import axios from "axios";
import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Container } from "@material-ui/core";
import NoteCard from "../components/NoteCard";
import Masonry from "react-masonry-css";

export default function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const axiosAPI = async () => {
      const response = await axios.get(`http://localhost:8000/notes`);
      setNotes(response.data);
    };
    axiosAPI();
  }, []);

  const handleDelete = async (id) => {
    const response = await axios.delete(`http://localhost:8000/notes/${id}`);
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <Container>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {notes.map((note) => {
          return (
            <div item key={note.id}>
              <NoteCard note={note} handleDelete={handleDelete} />
            </div>
          );
        })}
      </Masonry>
    </Container>
  );
}
