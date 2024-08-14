import { Concept } from "./app.concept-model";

export interface Tai {

    id: number,
    name: String,
    grupo: String,
    code: String,
    palabra1: String,
    palabra2: String,
    imagen1: String,
    imagen2: String,
    concepts: Concept[],
    enable: Boolean
    groupEnable: Boolean
}