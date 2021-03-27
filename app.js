const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()

const url = 'https://tiktok.com/@'

const dataTikTokUser = {
    UserName: '',
    Name: '',
    Following: '',
    Followers: '',
    Likes:''
}

const message = {
    error:''
}

app.get('/user/*',(req, res)=>{
    dataTikTokUser.UserName = req.params[0]
    axios.get(url + dataTikTokUser.UserName).then ((res)=>{
        try {
            $ = cheerio.load(res.data)
            dataTikTokUser.Name = $('.share-sub-title').html()
            let count = cheerio.load($('.count-infos').html())
            count('strong').slice(0,1).each((idx, elem) => { dataTikTokUser.Following = $(elem).text() })
            count('strong').slice(1,2).each((idx, elem) => { dataTikTokUser.Followers = $(elem).text() })
            count('strong').slice(2,3).each((idx, elem) => { dataTikTokUser.Likes = $(elem).text() })
        }
        catch (e) { }
    })
    .then(()=>{
        res.send(JSON.stringify(dataTikTokUser))
        console.log(JSON.stringify(dataTikTokUser))
    })
    .catch ((e)=>{
        res.send(e.message)
    })
})

app.listen(3000,()=>{

})

