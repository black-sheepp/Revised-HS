const Habit = require("../Model/habit")

module.exports.createNewHabit = async function(req,res){
    await Habit.create({
        user: req.user,
        content: req.body.content,
    });
    return res.redirect('back')
}

module.exports.deleteOneHabit = async function(req,res){
    await Habit.deleteOne({
        id: req.params._id
    })
    return res.redirect('back')
}