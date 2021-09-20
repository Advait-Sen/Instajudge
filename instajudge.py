# Instajudge

Speakers = {
    'PM': {
        'name': 'Prime Minister',
        'code': 'PM',
        'score': 0,
        'points': {},
        'received_pois':0,
        'pois_made':0,
    },

    'DP': {
        'name': 'Deputy Prime Minister',
        'code': 'DP',
        'score': 0,
        'points': {},
        'received_pois':0,
        'pois_made':0,
    },

    'GB': {
        'name': 'Member of Government Benches',
        'code': 'GB',
        'score': 0,
        'points': {},
        'received_pois':0,
        'pois_made':0,
    },

    'GW': {
        'name': 'Government Whip',
        'code': 'GW',
        'score': 0,
        'points': {},
        'received_pois':0,
        'pois_made':0,
    },

    'OL': {
        'name': 'Opposition Leader',
        'code': 'OL',
        'score': 0,
        'points': {},
        'received_pois':0,
        'pois_made':0,
    },

    'DO': {
        'name': 'Deputy Opposition Leader',
        'code': 'DO',
        'score': 0,
        'points': {},
        'received_pois':0,
        'pois_made':0,
    },

    'OB': {
        'name': 'Member of Opposition Benches',
        'code': 'OB',
        'score': 0,
        'points': {},
        'received_pois':0,
        'pois_made':0,
    },

    'OW': {
        'name': 'Opposition Whip',
        'code': 'OW',
        'score': 0,
        'points': {},
        'received_pois':0,
        'pois_made':0,
    }
}

errors = {
    'File': "You must create a file called 'Debate.judge' for the app to be able to judge it{}\n\nLexing failed",
    'Comment': 'Irrelevant writing "{}" must be commented out with a "#" in front',
    'Speaker': 'Invalid speaker "{}", must be one of PM, DP, GB, GW, OL, DO, OB or OW',
    'POI': 'Wrong number of arguments. A POI (point of interest) requires the person who made the poi, the speaker to '
           'whom the poi was addressed, the strength of the poi and the strength of the response, "{}" has got the '
           'wrong number of arguments',
    'Point': 'To define a point you need a speaker, a small sentence about the point, and then a number at the end '
             'denoting its score out of 30, "{}" is invalid',
    'Rebuttal': 'To define a rebuttal, you need to define the current speaker, the maker of the point, and a score for '
                'the rebuttal, "{}" is invalid',
    'Same speaker': 'You can\'t have a POI from a speaker who\'s speaking, {} is invalid',
    'Maths': 'You must have a valid number to assign a numeric score, {} is not a number'
}


def error(error_type, specific_snippet=''):
    if bool(specific_snippet):
        global line
        snippet = line.replace('\n', '')
    else:
        snippet = specific_snippet
    global i
    print(f'{error_type} error at line {i + 1}: {snippet}')
    print(str(errors[error_type]).format(snippet))
    end()


def speaker_check(speaker_name=''):
    if speaker_name in Speakers:
        return (Speakers[speaker_name])
    error('Speaker', speaker_name)


def end(): exit(input('\nPress enter to end the interpreter'))


def judge(param=None):
    # removing comments
    if param is None:
        param = []
    params = []
    for word in param:
        letters = list(word)
        if len(letters) > 0:  # for blank spaces
            if letters[0] == '#':
                break
            params.append(word)

    if params[0] == 'poi':
        if len(params) != 5:
            error('POI', ' '.join(params))

        poi(speaker_check(params[1]), speaker_check(params[2]), checkint(params[3]), checkint(params[4]))

    if params[0] == 'point':
        score = params[len(params) - 1]

        if len(params) < 3:
            error('Point')

        speaker = params[1]
        sentence_list = params
        sentence_list.remove('point')
        sentence_list.remove(score)
        sentence_list.remove(speaker)
        sentence = ' '.join(sentence_list)
        point(speaker_check(speaker), sentence, checkint(score))

    if params[0] == 'rebuttal':
        if len(params) != 4:
            error('Rebuttal', ' '.join(params))
        rebuttal(speaker_check(params[1]), speaker_check(params[2]), checkint(params[3]))


def poi(maker={}, speaker={}, strength=0, response=0):
    if maker == speaker:
        error('Same speaker')
    maker['score'] += strength - response
    maker['pois_made'] += 1;
    speaker['score'] += response - strength
    speaker['received_pois'] += 1


def point(speaker={}, point_string='', score=0):
    speaker['score'] += score
    speaker['points'][point_string] = score


def rebuttal(speaker={}, maker={}, score=0):
    speaker['score'] += score
    maker['score'] -= score


def checkint(arg=''):
    arg = arg.replace('\n', '')
    if arg.isdigit():
        return int(arg)
    error('Maths', arg)


# End setup

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

speaker_score_map = {}

for speaker in Speakers.keys():
    speaker_score_map.setdefault(speaker, Speakers[speaker]['score'])

sorted_winners = sorted(speaker_score_map.keys(), key=speaker_score_map.get, reverse=True)

for speaker_code in sorted_winners:
    speaker = Speakers[speaker_code]
    speaker_name = speaker['name']
    print('{}: {}'.format(speaker_name, speaker['score']))
    print('{} POIs received, {} made'.format(speaker['received_pois'], speaker['pois_made']))

    for point in speaker['points']:
        print(point)
        print(speaker['points'][point])
    print('')
