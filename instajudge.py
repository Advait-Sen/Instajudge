#Instajudge

Speakers={
    'PM' : {
        'name':'Prime Minister',
        'code':'PM',
        'score':0,
        'points':{}
    },

    'DP' : {
        'name':'Deputy Prime Minister',
        'code':'DP',
        'score':0,
        'points':{}
    },

    'GB' : {
        'name':'Member of Government Benches',
        'code':'GB',
        'score':0,
        'points':{}
    },

    'GW' : {
        'name':'Government Whip',
        'code':'GW',
        'score':0,
        'points':{}
    },

    'OL' : {
        'name':'Opposition Leader',
        'code':'OL',
        'score':0,
        'points':{}
    },

    'DO' : {
        'name':'Deputy Opposition Leader',
        'code':'DO',
        'score':0,
        'points':{}
    },

    'OB' : {
        'name':'Member of Opposition Benches',
        'code':'OB',
        'score':0,
        'points':{}
    },

    'OW' : {
        'name':'Opposition Whip',
        'code':'OW',
        'score':0,
        'points':{}
    }
}

errors = {
    'File': "You must create a file called 'Debate.judge' for the app to be able to judge it{}\n\nLexing failed",
    'Comment': 'Irrelevant writing "{}" must be commented out with a "#"',
    'Speaker': 'Invalid speaker "{}", must be one of PM, DP, GB, GW, OL, DO, OB or OW',
    'POI': 'POI requires the person who made the poi, the speaker to whom the poi was addressed, the strength of the '
           'poi and the strength of the response, "{}" is invalid',
    'Point': 'To define a point you need a speaker, a small sentence about the point, and then a number at the end '
             'denoting its score out of 30, "{}" is invalid'
}

def error(error_type, specific_snippet=''):
    if specific_snippet == '':
        global line
        snippet = line.replace('\n', '')
    else:
        snippet = specific_snippet
    global i
    print('{} error at line {}: {}'.format(error_type, i + 1, snippet))
    print(str(errors[error_type]).format(snippet))
    end()


def speaker_check(speaker_name):
    try:
        return(Speakers[speaker_name])
    except:
        error('Speaker', speaker_name)


def end(): exit(input('\nPress enter to end the interpreter'))


def judge(params):
    if params[0] == 'poi':
        if (len(params) > 5 and str(params[5]).split('')[0] != '#') or len(params) < 5:
            error('POI')
        poi(speaker_check(params[1]), speaker_check(params[2]), int(params[3]), int(params[4]))

    if params[0] == 'point':
        score = params[len(params) - 1]

        if len(params)==1:
            error('Point')
        
        if not (score.isdigit()):
            error('Point',score)
        speaker = params[1]
        sentence_list = params
        sentence_list.remove('point')
        sentence_list.remove(score)
        sentence_list.remove(speaker)
        sentence = ' '.join(sentence_list)
        point(speaker_check(speaker), sentence, int(score))


def poi(maker, speaker, strength, response):
    maker['score'] += strength - response
    speaker['score'] += response - strength


def point(speaker, point_string, score):
    speaker['score'] += score
    speaker['points'][point_string]=score # for responses


# todo def response
def response(speaker):
    print('WIP')

#End setup

print('Initialising lexer')

try:
    m = open("Debate.judge")
except:
    line = 'No debate found'
    i = -1
    error('File', ' ')

print('Lexing...')
message = m.readlines()
m.close()
print('Lexing complete!')

# Keywords: poi, point, rebuttal

keywords = ['poi', 'point', 'rebuttal']

ignore = ['\n', '#']

print('Parsing and interpreting debate')

for i in range(len(message)):
    line = message[i]
    words = line.split(" ")
    if list(words[0])[0] in ignore:
        continue
    elif words[0] in keywords:
        judge(words)
    else:
        error('Comment')

print('Parsing and interpreting complete, printing results...\n')

for speaker_code in Speakers:
    speaker=Speakers[speaker_code]
    speaker_name=speaker['name']
    print('{}: {}'.format(speaker_name,speaker['score']))

    for point_tuple in speaker['points']:
        print(point_tuple)
        print(speaker['points'][point_tuple])
    print('')

end()