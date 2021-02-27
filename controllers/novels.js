const Novels = require('../models/novels');


module.exports.index = async(req, res) => {
    const novels = await Novels.find({}).populate('author')
    res.render('Novels/index', { novels })
}

module.exports.renderNewForm = (req, res)=>{
    res.render('Novels/new')
}

module.exports.createNovel = async(req, res, next) => {
    const newnovel = new Novels(req.body.novels)
    newnovel.author = req.user._id
    // console.log(req.body);
    await newnovel.save();
    req.flash('success', 'Successfully added a new novel.')
    res.redirect(`/novels/${newnovel._id}`)
}

module.exports.showNovels = async(req,res, next)=>{
    const { id } = req.params;
    const novels = await Novels.findById(id).populate({
        path:'reviews',
        populate:{
            path: 'author'
        }
    }).populate('author');
    // console.log(novels);
    if (!novels) {
        req.flash('error', 'Sorry, cannot find your novel!');
        return res.redirect('/novels');
    }
    res.render('Novels/show', { novels })
}

module.exports.renderEditForm = async(req, res, next)=>{
    const { id } = req.params;
    const novel = await Novels.findById(id) 
    if (!novel) {
        req.flash('error', 'Sorry, cannot find your novel!');
        return res.redirect('/novels');
    }
    res.render('Novels/edit', { novel })
}

module.exports.updateNovel = async(req, res, next)=>{
    const { id } = req.params;
    const novel = await Novels.findByIdAndUpdate(id, req.body.novels, { runValidators: true, new:true })
    req.flash('success', 'Successfully updated your novel!');
    res.redirect(`/novels/${novel._id}`);
}

module.exports.deleteNovel = async(req, res, next)=>{
    const { id } = req.params;
    const novel = await Novels.findByIdAndRemove(id)  
    req.flash('success', 'Successfully deleted campground')
    res.redirect('/novels')
}