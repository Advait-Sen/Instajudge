keywords = {
    3: 'Fizz',
    5: 'Buzz',
    7: 'Pop',
}

limit = (0, 100)

for i in range(limit[0], limit[1]):
    output = ''

    for k in keywords:
        output += keywords[k] * int(k == 0)

    output += str(i) * int(output == '')

    print(output)
