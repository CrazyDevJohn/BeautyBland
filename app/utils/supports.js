export const fetchQuery = `*[_type == 'products'] | order(_createdAt desc){
  _id,
  title,
    productType,
    mainImage->{
      asset -> {
      uri
      }
    }, 
    bgImage->{
      asset -> {
      uri
      }
    },
  shortDescription,
  description,
  price,
  categories[] -> {
    _id,
    title,
    mainImage
  }
}`;
