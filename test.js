const str = '퇴근시간은 언제 오나?';

const str2 = str.replace('퇴근', '출근');

const str3 = str.replace(/(퇴근)/g, '$1 빨리 하고 싶다');

console.log('------------str-----------');
console.log(str);

console.log('------------str2-----------');
console.log(str2);

console.log('------------str3-----------');
console.log(str3);