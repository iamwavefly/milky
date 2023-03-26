export default function checkObjProp(obj) {
  return Object.values(obj).every((x) => !x);
}
