export function formateDate(time){
  if(!time) return ''
  let date =new Date(time)
  let Day = date.getDate()
  let Hour = date.getHours();
  let Minutes = date.getMinutes();
  let Seconds = date.getSeconds();
  // console.log(Day)

  function Toogle(props){
    if(props< 10){
      return '0'+props
    }else{
      return props
    }

  }
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + Toogle(Day)
  + ' ' + Toogle(Hour) + ':' + Toogle(Minutes) + ':' + Toogle(Seconds);

}
