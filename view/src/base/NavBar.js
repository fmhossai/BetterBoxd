const NavBar = ({
  setLoggedIn,
  setHomePageOpen,
  setListPageOpen,
  setUserPageOpen,
  setMoviePageOpen,
}) => {
  const logOut = () => {
    setLoggedIn(false);
  };
  const openHomePage = () => {
    setHomePageOpen(true);
    setMoviePageOpen(false);
    setUserPageOpen(false);
    setListPageOpen(false);
  };
  const openListPage = () => {
    setHomePageOpen(false);
    setMoviePageOpen(false);
    setUserPageOpen(false);
    setListPageOpen(true);
  };
  const openUserPage = () => {
    setHomePageOpen(false);
    setMoviePageOpen(false);
    setUserPageOpen(true);
    setListPageOpen(false);
  };
  const openMoviePage = () => {
    setHomePageOpen(false);
    setMoviePageOpen(true);
    setUserPageOpen(false);
    setListPageOpen(false);
  };
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" style={{cursor: "auto"}}>
          BetterBoxd
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item" onClick={openHomePage} style={{cursor: "pointer"}}>
              <a class="nav-link active" aria-current="page">
                Home
              </a>
            </li>
            <li class="nav-item" onClick={openMoviePage} style={{cursor: "pointer"}}>
              <a class="nav-link">
                Movies
              </a>
            </li>
            <li class="nav-item" onClick={openListPage} style={{cursor: "pointer"}}>
              <a class="nav-link">
                Lists
              </a>
            </li>
            <li class="nav-item" onClick={openUserPage} style={{cursor: "pointer"}}>
              <a class="nav-link">
                Users
              </a>
            </li>
          </ul>
          <form class="d-flex">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success" type="submit">
              Search
            </button>
            <button
              class="btn btn-outline-success"
              type="submit"
              onClick={logOut}
              style={{ marginLeft: 8, width: 150 }}
            >
              Log Out
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
