import { faker } from "@faker-js/faker";

function createRandomUri() {
    return `spotify:playlist:${faker.string.numeric(12)}`;
}

export default createRandomUri;
