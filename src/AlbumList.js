import React, {useState, useEffect} from "react";

function AlbumList({ user = {} }) {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    setAlbums([]);
    const abortSwitch = new AbortController();

    // Load data from https://jsonplaceholder.typicode.com/albums?userId=${user.id}
    async function loadAlbums() {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${user.id}`, {signal: abortSwitch.signal});
        const albumsFetched = await response.json();
        setAlbums(albumsFetched);
      } catch (error) {
        if (error.name !== "AbortError") {
          throw error;
        }
      }
    }

    if (user.id) loadAlbums();
    return () => { abortSwitch.abort() }
  }, [user])

  const albumsDisplayed = albums.map((album, index) => {
    return <li key={index}>{album.id} - {album.title}</li>
  });

  if (albums.length > 0) {
    return <div>
      <h2>{user.name} Albums</h2>
      <ul>{albumsDisplayed}</ul>
    </div>;
  } else return <p>Please click on a user name to the left</p>;
}

export default AlbumList;
