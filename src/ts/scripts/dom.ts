export const createDomAnchor = (anchorId: string) => {
  const anchor = document.createElement('div')
  anchor.id = anchorId
  document.body.appendChild(anchor)
}
