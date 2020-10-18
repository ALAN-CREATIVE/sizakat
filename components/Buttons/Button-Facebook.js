export default function ButtonFacebook() {
  return (
    <div id="btn-facebook">
      <main>
        <button className="facebook">
          <img src="https://img.icons8.com/color/48/000000/facebook.png" />
          <div>
            <p> Login with facebook</p>
          </div>
        </button>
      </main>

      <style jsx>{`
        .facebook {
          display: flex;
          background: #00239d;
          border-radius: 10px;
          padding: 3%;
        }

        .facebook p {
          margin: 7px 1px;
          font-size: 17px;
        }

        .facebook img {
          margin: 3px;
          width: 40px;
          height: 40px;
        }

        button {
          width: 100%;
          height: 65px;
        }
      `}</style>
    </div>
  );
}
