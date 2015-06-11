from random import randint, random
from json import dump, load


def saveJson(data, filename):
    with open('{0}.json'.format(filename),'w') as f:
        dump(data, f, indent='    ')


def rngArray(arr, param):
    for item in arr:
        if 'divider' not in item.keys():
            if 'children' in item.keys():
                rngArray(item['children'], param)
            else:
                item[param] = random() * 100


def main():
    commands = load(open('menu.json'))
    panels = load(open('panels.json'))
    tools = load(open('tools.json'))

    rngArray(commands, 'relevancy')
    rngArray(commands, 'familiarity')
    rngArray(panels, 'relevancy')
    rngArray(panels, 'familiarity')
    rngArray(tools, 'relevancy')
    rngArray(tools, 'familiarity')

    saveJson(commands, 'commandsExtra')
    saveJson(panels, 'panelsExtra')
    saveJson(tools, 'toolsExtra')


if __name__ == '__main__':
    main()
