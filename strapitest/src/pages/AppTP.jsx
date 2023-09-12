import React, { useState, useEffect } from "react";
import "../App.css";

// Créez un composant Commentaire pour afficher un commentaire individuel
function Commentaire({ pseudo, commentaire }) {
  return (
    <div className="comment-box">
      <strong>{pseudo}</strong> :
      <br />
      <p className="text">{commentaire}</p>
      <br />
    </div>
  );
}

function App() {
  const [pseudo, setPseudo] = useState("");
  const [commentaire, setCommentaire] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Récupération des commentaires depuis l'API Strapi
    fetch("http://localhost:1337/api/Commentaires")
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) =>
        console.error(
          "Erreur lors de la récupération des commentaires :",
          error
        )
      );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Envoi du commentaire à l'API Strapi
    fetch("http://localhost:1337/api/Commentaires", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          pseudo,
          commentaire,
        },
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          // Commentaire ajouté normalement
          return response.json();
        } else {
          // Erreur 400 ?
          throw new Error(`Erreur . Status: ${response.status}`);
        }
      })
      .then(() => {
        setSuccessMessage("Le commentaire a été ajouté avec succès!");
        setPseudo("");
        setCommentaire("");
        // Actualiser la liste des commentaires
        fetch("http://localhost:1337/api/Commentaires")
          .then((response) => response.json())
          .then((data) => setComments(data))
          .catch((error) =>
            console.error(
              "Erreur lors de la récupération des commentaires :",
              error
            )
          );
      })
      .catch((error) =>
        console.error("Erreur lors de l'ajout du commentaire :", error)
      );
  };

  return (
    <div className="App">
      <main>
        {/* Affichage du message de réussite */}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        <p className="comment-count">{comments.length} commentaire(s)</p>
        {/* Afficher les commentaires en utilisant le composant Commentaire */}
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Commentaire
              key={comment.id}
              pseudo={comment.pseudo}
              commentaire={comment.commentaire}
            />
          ))
        ) : (
          <p>Aucun commentaire trouvé.</p>
        )}
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
          ></textarea>
          <br />
          <input type="submit" value="Envoyer le Message" />
        </form>
      </main>
    </div>
  );
}

export default App;
