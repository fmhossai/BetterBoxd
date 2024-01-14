import TraktLogo from './trakt-wide-red-black.png';
const Footer = () => {
    return (
        <div class="container">
            <footer class="d-flex flex-wrap justify-content-between py-3 my-4 border-top">
                <section class="col-md-4 mb-0 d-flex align-items-center">
                    Betterboxd
                </section>

                <p class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                    Artwork provided by Fanart.tv
                </p>

                <div class="nav col-md-4 d-flex align-items-center justify-content-end">
                    <span class="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
                        Powered by
                    </span>
                    <img
                        src={TraktLogo}
                        className="mb-md-0 text-body-secondary text-decoration-none lh-1 w-25"
                    ></img>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
