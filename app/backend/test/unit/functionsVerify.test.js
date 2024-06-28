const {verifyIdIsAceeptable,verifyCategorIsAcceptable,verifyResumeAndTitleIsAceeptable, verifyResumeAndTitleIsSmaller} =require('../../controller/verifyFunctions')
var resume = `test lorem iees ehbqwe 31 eqe mq,wen qwed qpoej qe qwe qwee qwed vvvv 3jlqne
qkwjehnqjkweb qwenwj qwne qweweq qweqweqw qweqw qwjmek qwemjk qwe qmnedb5 3453`
var title = "testing and one qybw"

describe('test function verifyCategoryIsAcceptable',()=>{
    test('veryfi category games is accepable expect true',()=>{
        
        const check_category_games = verifyCategorIsAcceptable('games')
        const check_category_all = verifyCategorIsAcceptable('all')
        const check_category_sports = verifyCategorIsAcceptable('sports')
        const check_category_null = verifyCategorIsAcceptable(null)
        const check_category_animals = verifyCategorIsAcceptable('animals')

        expect(check_category_games).toBeTruthy()
        expect(check_category_all).toBeTruthy()
        expect(check_category_sports).toBeTruthy()
        expect(check_category_animals).toBeTruthy()
        expect(check_category_null).toBeFalsy()
    })


describe('test function verifyIdIsAceeptable',()=>{
    test('verify the verifyIdIsAceeptable function shoudl return true when a number',()=>{
        const check_id  = verifyIdIsAceeptable(45)
        const check_id_numberInAString = verifyIdIsAceeptable('45')
        const check_id_aLetter = verifyIdIsAceeptable('e')

        expect(check_id).toBeTruthy()
        expect(check_id_numberInAString).toBeTruthy()
        expect(check_id_aLetter).toBeFalsy()
    })
})
describe('test function verify verifyResumeAndTitleIsAceeptable ',()=>{
    test('should return true  when send a resume smaller than 155 and a title smaller than 20',()=>{
       
        const verify = verifyResumeAndTitleIsAceeptable(resume,title)
        expect(resume.length).toBe(155)
        expect(title.length).toBe(20)
        expect(verify).toBeTruthy()
    })
    test('should return false  when send a resume equal  160 and a title equal 25',()=>{
        const resumeConcat = resume.concat('value')
        const titleConcat = title.concat('value')
        const verify = verifyResumeAndTitleIsAceeptable(resumeConcat,titleConcat)
       
        expect(resumeConcat.length).toBe(160)
        expect(titleConcat.length).toBe(25)
        expect(verify).toBeFalsy()
    })
    test('should return false  when send a resume equal  undefined,null and "", title equal undefined or null and "" ',()=>{
       
        const verifyResumeEqualUndefined = verifyResumeAndTitleIsAceeptable(undefined,title)
        const verifyResumeEqualNull = verifyResumeAndTitleIsAceeptable(null,title)
        const verifyResumeEqualQuoteNull = verifyResumeAndTitleIsAceeptable('',title)
        const verifyTitleEqualUndefine = verifyResumeAndTitleIsAceeptable(resume,undefined)
        const verifyTitleEqualNull =verifyResumeAndTitleIsAceeptable (resume,null)
        const verifyTitleEqualNullQuote = verifyResumeAndTitleIsAceeptable(resume,"")

        expect(verifyResumeEqualUndefined).toBeFalsy()
        expect(verifyResumeEqualNull).toBeFalsy()
        expect(verifyResumeEqualQuoteNull).toBeFalsy()
        expect(verifyTitleEqualUndefine).toBeFalsy()
        expect(verifyTitleEqualNull).toBeFalsy()
        expect(verifyTitleEqualNullQuote).toBeFalsy()
        expect(resume.length).toBe(155)
        expect(title.length).toBe(20)
    
    })
})
})