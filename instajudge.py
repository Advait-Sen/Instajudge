# [score, points_list] todo names?

PM = [0, []]

DP = [0, []]

GB = [0, []]

GW = [0, []]

OL = [0, []]

DO = [0, []]

OB = [0, []]

OW = [0, []]

errors = {
    'File': "You must create a file called 'Debate.judge' for the app to be able to judge it{}",
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


def end(): exit(input('\nPress enter to end the interpreter'))


def judge(params):
    if params[0] == 'poi':
        if (len(params) > 5 and str(params[5]).split('')[0] != '#') or len(params) < 5:
            error('POI')
        poi(speaker_check(params[1]), speaker_check(params[2]), int(params[3]), int(params[4]))

    if params[0] == 'point':
        score = params[len(params) - 1]
        speaker = params[1]
        if not (score.isdigit()):
            error('Point')
        sentence_list = params
        sentence_list.remove('point')
        sentence_list.remove(score)
        sentence_list.remove(params[0])
        sentence = ' '.join(sentence_list)
        point(speaker_check(speaker), sentence, int(score))


def speaker_check(speaker):
    if speaker == 'PM':
        return PM
    elif speaker == 'DP':
        return DP
    elif speaker == 'GB':
        return GB
    elif speaker == 'GW':
        return GW
    elif speaker == 'OL':
        return OL
    elif speaker == 'DO':
        return DO
    elif speaker == 'OB':
        return OB
    elif speaker == 'OW':
        return OW
    else:
        error('Speaker', speaker)


def poi(maker, speaker, strength, response):
    maker[0] += strength - response
    speaker[0] += response - strength


def point(speaker, point_string, score):
    speaker[0] += score
    speaker[1].append([point_string, score])  # for responses


# todo def response


print('Initialising lexer')

try:
    m = open("Debarte.judge")
except:
    line = 'No debate found'
    i = -1
    error('File', ' ')

print('Lexing...')
message = m.readlines()
m.close()
print('Lexing complete!')

# Keywords: poi, point, response

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

print('Parsing and interpreting complete, printing results...')

print('PM: ' + str(PM[0]))
for item in PM[1]:
    print(item[0])

end()
