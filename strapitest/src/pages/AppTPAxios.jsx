import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

function Commentaires() {
  const [pseudo, setPseudo] = useState("");
  const [commentaire, setCommentaire] = useState("");
  const [comments, setComments] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    // Récupération des commentaires depuis Strapi
    axios
      .get("http://localhost:1337/api/commentaires?_sort=date_creation:desc")
      .then((response) => {
        // Assurez-vous que response.data est un tableau avant de le mettre dans le state
        if (Array.isArray(response.data)) {
          setComments(response.data);
        }
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Envoi du commentaire à Strapi
    axios
      .post("http://localhost:1337/api/commentaires", {
        pseudo: pseudo,
        commentaire: commentaire,
      })
      .then((response) => {
        setSuccessMessage("Le commentaire a été ajouté avec succès!");
        setPseudo("");
        setCommentaire("");
        setError(null);
        // Recharge la liste des commentaires après l'ajout
        axios.get("http://localhost:1337/api/commentaires").then((response) => {
          setComments(response.data);
        });
      })
      .catch((error) => {
        setError("Erreur lors de l'ajout du commentaire");
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Commentaires</h1>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {error && <div className="error-message">{error}</div>}
      <p className="comment-count">{comments.length} commentaire(s)</p>
      {comments.map((comment, index) => (
        <div className="comment-box" key={index}>
          <strong>{comment.pseudo}</strong> le{" "}
          {new Date(comment.date_creation).toLocaleString()}:
          <p className="text">{comment.commentaire}</p>
        </div>
      ))}
      <h2>Ajouter un commentaire :</h2>
      <form onSubmit={handleSubmit} className="comment-form">
        <label htmlFor="pseudo">Pseudo:</label>
        <input
          type="text"
          name="pseudo"
          required
          className="input-pseudo"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
        />
        <br />
        <label htmlFor="commentaire">Message:</label>
        <textarea
          name="commentaire"
          rows="4"
          required
          className="input-comment"
          value={commentaire}
          onChange={(e) => setCommentaire(e.target.value)}
        />
        <br />
        <input type="submit" value="Envoyer le Message" />
      </form>
    </div>
  );
}

export default Commentaires;
