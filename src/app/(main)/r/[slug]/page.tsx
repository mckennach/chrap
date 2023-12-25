export default async function Topic({ params }: { params: { slug: string } }) {
  return (
    <div>
      <h1>Topic: {params.slug}</h1>
    </div>
  )
}
