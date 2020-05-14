class Render {

    renderData(data){
        $(`#container`).empty()
        const source = $(`#container-template`).html()
        const template = Handlebars.compile(source)
        const newHtml = template({city: data})
        $(`#container`).append(newHtml)
    }
}