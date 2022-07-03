export const formatDefinition = (def) => {
  delete def.internalRep;
  delete def.createDate;
  delete def.modDate;
  delete def.userNick;
  delete def.type;
  return  def;
};

export default (object) => object.definitions.map((def) => formatDefinition(def));

