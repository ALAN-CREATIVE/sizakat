export default function ButtonGoogle() {
  return (
    <div id="btn-google">
      <main>
        <button className="google">
          <img src="https://img.icons8.com/color/48/000000/google-logo.png" />
          <div>
            <p> Login with google</p>
          </div>
        </button>
      </main>

      <style jsx>{`
        .google {
          display: flex;
          background: #c2c2c2;
          border-radius: 10px;
          padding: 5%;
        }

        .google p {
          margin: 3px 1px;
          color: black;
        }

        .google img {
          margin: 3px;
          width: 30px;
          height: 30px;
        }

        button {
          width: 100%;
          height: 65px;
        }

        .btn-google {
          padding: 0px;
        }
      `}</style>
    </div>
  );
}
