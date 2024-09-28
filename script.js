// const container = document.querySelector('.container');
// const seats = document.querySelectorAll('.row .seat:not(.occupied)');
// const count = document.getElementById('count');
// const total = document.getElementById('total');
// const movieSelect = document.getElementById('movie');

// populateUI();

// let ticketPrice = +movieSelect.value;

// //save selected movie index and price
// function setMovieData(movieIndex, moviePrice) {
//   localStorage.setItem('selectedMovieIndex', movieIndex);
//   localStorage.setItem('selectedMoviePrice', moviePrice);
// }

// //update total and count
// function updateSelectedCount() {
//   const selectedSeats = document.querySelectorAll('.row .seat.selected');

//   const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

//   localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

//   const selectedSeatsCount = selectedSeats.length;

//   count.innerText = selectedSeatsCount;
//   total.innerText = selectedSeatsCount * ticketPrice;
// }

// //Get data from storage and populateUI
// function populateUI() {
//   const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

//   if (selectedSeats !== null && selectedSeats.length > 0) {
//     seats.forEach((seat, index) => {
//       if (selectedSeats.indexOf(index) > -1) {
//         seat.classList.add('selected');
//       }
//     }) 
//   }

//   const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

//   if (selectedMovieIndex !== null) {
//     movieSelect.selectedIndex = selectedMovieIndex;
//   }
// }

// //Movie Select Event
// movieSelect.addEventListener('change', e => {
//   ticketPrice = +e.target.value;
//   setMovieData(e.target.selectedIndex, e.target.value);
//   updateSelectedCount();
// })

// //seat click event
// container.addEventListener('click', e => {
//   if(e.target.classList.contains('seat') && 
//   !e.target.classList.contains('occupied')
//    ) {
//     e.target.classList.toggle('selected');

//     updateSelectedCount();
//   }
// })

// //initial count and total set
// updateSelectedCount();

let url=window.location.href;
// console.log(url);
let url_segment = url.split('?');

let play_btn=document.getElementById('play');
let video=document.getElementById('video');

play_btn_addEventListener('click', ()=>{
  if(video.paused){
    video.play();
    video.style.display='unset';
    play_btn.classList.remove('bi-play-fill');
    play_btn.classList.add('bi-pause');
  }else{
    video.pause();
    video.style.display='none';
    play_btn.classList.add('bi-play-fill');
    play_btn.classList.remove('bi-pause');

  }
})

video.addEventListener('ended', ()=>{
  video.play();
})

let date=new Date();
let main_date=date.getDate();
// console.log(main_date);

Array.from(document.getElementsByClassName('date_point')).forEach(el()=>{
  if(el.innerText==main_date) {
    el.classList.add('h6_active')
  }
})

let pvr=[{
  pvr:'PVR Inox',
  movie: 'Jawan',
  loc:'Ameerpet',
  audi:1,
  type:'4DX',
  series: ['j','h','f','e','d','c','b','a'],
  row_selection: 3,
  seat: 24,
  j: [2,6,24,23,7,16,17,18,19,13,12],
  h: [1,2,78,20,23,8,11,18,19,13,12],
  f: [5,6,15,17,18],
  e: [2,7,8,17,18],
  d: [5,16,15,23,22],
  c: [1,2,11,12,19],
  b: [8,5],
  a: [],
  price: [800,800,560,560,560,430,430],
  date: 23,
  img: 'img/Jawan-poster.webp',
  video: 'video/Jawan Official Trailer-(HDvideo9).mp4'
},
{
  pvr:'PVR Inox',
  movie: 'Gadar 2',
  loc:'Ameerpet',
  audi:2,
  type:'4DX',
  series: ['j','h','f','e','d','c','b','a'],
  row_selection: 3,
  seat: 24,
  j: [2,6,24,23,7,16,17,18,19,13,12],
  h: [1,2,78,20,23,8,11,18,19,13,12],
  f: [5,6,15,17,18],
  e: [2,7,8,17,18],
  d: [5,16,15,23,22],
  c: [1,2,11,12,19],
  b: [8,5],
  a: [],
  price: [800,800,560,560,560,430,430],
  date: 23,
  img: 'img/Gadar2.jpg',
  video: 'video/Gadar2 Official Trailer - 11th August - Sunny Deol - Ameesha Patel - Anil Sharma - Zee Studios.mp4'
}]

let addSeats(arr)=>{
  // console.log(arr);
  arr.forEach((el, i) => {
    const {series, row_selection, seat, price, a, b, c, d, e, f, g, h, j}=el;

    for(let index=0; index<series.length; index++){
      // console.log(series[index]);
      let row=document.createElement('div');
      row.className='row';

      let booked_seats=[...eval(series[index].toLocaleLowerCase())];

      for(let seats=0; seats<seat; seats++){

        if(seats===0){
          let =document.createElement('span');
          row.appendChild(span);
        }

        let li=document.createElement('li');
        let filter=booked_seats.filter(el=>{
          return el===seats;
        })

        if(filter.length>0){
          li.className='booked';
        }else{
          li.className='seat';
        }

        li.id=series[index]+seats;
        li.setAttribute('book', seats);
        li.setAttribute('sr', series[index]);
        li.innerText=price[index];

        li.onclick=()=>{
          if(li.className==='booked'){
            li.classList.remove('selected');
          }else{
            li.classList.toggle('selected');
          }
          let len=Array.from(document.getElementsByClassName('selected')).length;
        if(len>0){
          document.getElementById('book_ticket').style.display='unset';
        }else{
          document.getElementById('book_ticket').style.display='none';
        }

        }

        
        row.appendChild(li);

        if(seats===seat-1){
          let span=document.createElement('span');
          span.innerText=series[index];
          row.appendChild(span);
        }
    }

    document.getElementById('chair').appendChild(row);
    }

  })
}

let data=pvr.filter(obj=>obj.date===main_date && obj.movie===url_segment[1]);
// console.log(data);

document.getElementById('title').innerText=data[0].movie;
document.getElementById('poster').src=data[0].img;
document.getElementById('video').src=data[0].video;

addSeats(data);



let offDate=()=>{
  Array.from(document.getElementsByClassName('date_point')).forEach(el=>{
    el.classList.remove('h6_active');
  })
}

Array.from(document.getElementsByClassName('date_point')).forEach(el=>{
  el.addEventListener('click', ()=>{
    if(el.innerText>dateDate()-1){
      offDate();
      el.classList.add('h6_active');
      main_date=+el.innerText;
      document.getElementById('chair').innerHTML='';
      let data=getData.filter(obj=>obj.date===main_date && obj.movie===url_segment[1]);
      addSeats(data)
    }
  })
})

document.getElementById('book_ticket').addEventListener('click', ()=>{
  Array.from(document.getElementsByClassName('selected')).forEach(el=>{
    let seat_no=el.getAttribute('book');
    let seat_sr=el.getAttribute('sr');
    let price=el.innerText;

    let obj={
      "movie":url_segment[1],
      "date":main_date
    }

    let getData=pvr.map((obj)=>{
      if(obj.movie===url_segment[0] && obj.date===main_date){
        obj[seat_sr].push(+seat_no);
      }
      return obj;
    })

    document.getElementById('chair').innerHTML='';
    let data=getData.filter(obj=>obj.date===main_date && obj.movie===url_segment[1]);
    addSeats(data);

    document.getElementById('screen').style.display='none';
    document.getElementById('chair').style.display='none';
    document.getElementById('det').style.display='none';
    document.getElementById('ticket').style.display='block';
    document.getElementById('book_ticet').style.display='none';
    document.getElementById('back_ticket').style.display='unset';

    let tic=document.createElement('div');
    tic.className='tic';
    tic.innerHTML=`
    <div class="barcode">
            <div class="card">
              <h6>ROW ${seat_sr.toLocaleUpperCase()}</h6>
              <h6>${main_date} September 2024</h6>
            </div>
            <div class="card">
              <h6>Seat ${seat_no}</h6>
              <h6>23:00</h6>
            </div>
            <svg id="${seat_sr}${seat_no}barcode"></svg>
            <h5>Inox Cinema</h5>
          </div>
          <div class="tic_details">
            <div class="type">4DX</div>
            <h5 class="pvr"><span>Inox </span>Cinema</h5>
            <h1>Jawan</h1>
            <div class="seat-det">
              <div class="seat-cr">
                <h6>ROW</h6>
                <h6>J</h6>
              </div>
              <div class="seat-cr">
                <h6>Seat</h6>
                <h6>18</h6>
              </div>
              <div class="seat-cr">
                <h6>Date</h6>
                <h6>7 <sub>September </sub> </h6>
              </div>
              <div class="seat-cr">
                <h6>Time</h6>
                <h6>11:30 PM</h6>
              </div>
            </div>
          </div>`

          document.getElementById('ticket').appendChild(tic);

          JsBarcode(`${seat_sr}${seat_no}barcode`,`${seat_sr.toLocaleUpperCase()}${seat_no}${price}${main_date}92024`);
  })
})

document.getElementById('back_ticket').addEventListener('click',()=>{
    document.getElementById('screen').style.display='inline-block';
    document.getElementById('chair').style.display='block';
    document.getElementById('det').style.display='flex';
    document.getElementById('ticket').style.display='none';
    document.getElementById('book_ticet').style.display='none';
    document.getElementById('back_ticket').style.display='unset';
})


