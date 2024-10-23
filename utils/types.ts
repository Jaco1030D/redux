type headersType = {
    "Content-Type"?: string,
    Authorization?: string
  }
  
  export type configTypes = {
    method: string,
    body: BodyInit | null | undefined | object,
    headers: headersType
  }