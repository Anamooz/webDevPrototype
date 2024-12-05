import { css } from "lit";
const styles = css`
body {
    font-family: var(--font-family-body);
}

header {
    text-align: center;
    border-style: double;
    background-color: var(--color-text);
    font-family: var(--font-family-display);
    padding: 10px;
    margin-bottom: 5px;
}

h2 {
    text-align: center;
    border-style: double;
    background-color: var(--color-text);
}

li {
    color: var(--color-text);
    text-align: center;
    aspect-ratio: 16/9;
    background-size: cover;
}

a {
    color: var(--color-text);
    text-align: center;
    font-size: 100px;
    -webkit-text-stroke-color: rgb(88, 62, 13);
    -webkit-text-stroke-width: 1px;
}

.page {
    display: flex;
    flex-direction: column;
}
`;

export default { styles };


