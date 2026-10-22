const aliases: Record<string, string[]> = {
  cn:['中国','中国大陆','China','Mainland China'],us:['美国','United States','USA'],
  gb:['英国','United Kingdom','UK'],de:['德国','Germany'],jp:['日本','Japan'],
  kr:['韩国','South Korea','Republic of Korea'],it:['意大利','Italy'],fr:['法国','France'],
  ca:['加拿大','Canada'],no:['挪威','Norway'],es:['西班牙','Spain'],ch:['瑞士','Switzerland'],
  au:['澳大利亚','Australia'],pt:['葡萄牙','Portugal'],se:['瑞典','Sweden'],il:['以色列','Israel'],
  pl:['波兰','Poland'],dk:['丹麦','Denmark'],tw:['中国台湾','Taiwan, China','Taiwan'],sk:['斯洛伐克','Slovakia'],
};
const codeByName=new Map(Object.entries(aliases).flatMap(([code,names])=>[code,...names].map(name=>[name.toLocaleLowerCase(),code])));
export const repositoryCountryCode = (country?: string) => codeByName.get(country?.trim().toLocaleLowerCase() ?? '');
