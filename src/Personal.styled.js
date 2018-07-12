import styled from "styled-components";

const PersonalHeader = styled.div`
  color: #212121;
  padding-bottom: 30px;
  h1 {
    margin-left: 8px;
  }
  ul.info {
    margin-left: 10px;
    li {
      list-style-type: none;
    }
  }
  h5.disclaimer {
    background: #bdbdbd;
    padding: 10px;
    border-radius: 10px;
    margin: 10px 0 0 10px;
  }
  ul.contact {
    margin-top: 5px;
    margin-left: 10px;
    li {
      display: inline;
      list-style-type: none;
      padding: 0 10px 0 0;
      a {
        font-weight: 600;
        color: #212121;
        text-decoration: none;
        white-space: nowrap;
        position: relative;
        &::before {
          content: "";
          position: absolute;
          width: calc(100% - 23px);
          height: 1px;
          bottom: 0;
          left: 23px;
          background-color: #23007e;
          visibility: hidden;
          transform: scaleX(0);
          transition: all 0.3s ease-in-out 0s;
        }
      }
      svg {
        font-size: 130%;
        margin-right: 3px;
        color: #4300e4;
        transition: all 0.15s ease-in-out;
      }
      &:hover {
        color: #23007e;
        &::before {
          visibility: visible;
          transform: scaleX(1);
        }
        svg {
          transform: scale(1.3);
          transition: all 0.15s ease-in-out;
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    ul.contact li {
      display: inherit !important;
    }
  }
`;

export default PersonalHeader;
