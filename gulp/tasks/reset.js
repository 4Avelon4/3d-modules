import del from "del";
export const reset = _ => {
  return del(app.path.clean);
}
