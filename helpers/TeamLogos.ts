import { importTeamLogos } from "./image.helper";

const teamLogos: { [key: string]: string } = importTeamLogos(
    require.context("../static", false, /\.(svg)$/)
);

export default teamLogos;
