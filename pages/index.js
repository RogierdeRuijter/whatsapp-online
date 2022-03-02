import styled from "styled-components";
import maxres from "../public/maxresdefault.jpg";
import Image from "next/image";

const Wrapper = styled.div`
  background-color: #fff;
`;

const Container = styled.div`
  width: 700px;
  max-width: 100%;
  margin: auto;
  p > {
    line-height: 1.4;
  }
`;

export default function Home() {
  return (
    <Wrapper>
      <Container>
        <header>
          <h1>Lets take back our privacy</h1>
        </header>
        <p>
          Currenly, we cant be anonyoums on Whatsapp. The other person will
          always see if we are online or not.
        </p>
        <Image src={maxres} />
        <p>Sign this petition to transform Whatsapp.</p>
        <div>
          <button>Sign petition</button> <span>Total signatures: 0</span>
        </div>
        <aside style={{ position: "fixed", bottom: 0, paddingBottom: "1em" }}>
          When this petiton reaches 100.000 signatures it will be summited to
          Whatsapp.
        </aside>
      </Container>
    </Wrapper>
  );
}
