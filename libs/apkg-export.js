/*
Extremely hard fork of npm.im/anki-apkg-export
This file is licensed under the MIT.
*/
window.getLastItem = obj => {
    const keys = Object.keys(obj);
    const lastKey = keys[keys.length - 1];
  
    const item = obj[lastKey];
    delete obj[lastKey];
  
    return item;
  };
  
  window.createTemplate = function ({
    questionFormat = '{{Front}}',
    answerFormat = '{{FrontSide}}\n\n<hr id="answer">\n\n{{Back}}',
    css = '.card {\n font-family: arial;\n font-size: 20px;\n text-align: center;\n color: black;\nbackground-color: white;\n}\n'
  } = {}) {
    const conf = {
        nextPos: 1,
        estTimes: true,
        activeDecks: [1],
        sortType: 'noteFld',
        timeLim: 0,
        sortBackwards: false,
        addToCur: true,
        curDeck: 1,
        newBury: true,
        newSpread: 0,
        dueCounts: true,
        curModel: '1435645724216',
        collapseTime: 1200
    };
  
    const models = {
        1388596687391: {
            veArs: [],
            name: 'Basic-f15d2',
            tags: ['Tag'],
            did: 1435588830424,
            usn: -1,
            req: [[0, 'all', [0]]],
            flds: [
                {
                    name: 'Front',
                    media: [],
                    sticky: false,
                    rtl: false,
                    ord: 0,
                    font: 'Arial',
                    size: 20
                },
                {
                    name: 'Back',
                    media: [],
                    sticky: false,
                    rtl: false,
                    ord: 1,
                    font: 'Arial',
                    size: 20
                }
            ],
            sortf: 0,
            latexPre:
                '\\documentclass[12pt]{article}\n\\special{papersize=3in,5in}\n\\usepackage[utf8]{inputenc}\n\\usepackage{amssymb,amsmath}\n\\pagestyle{empty}\n\\setlength{\\parindent}{0in}\n\\begin{document}\n',
            tmpls: [
                {
                    name: 'Card 1',
                    qfmt: questionFormat,
                    did: null,
                    bafmt: '',
                    afmt: answerFormat,
                    ord: 0,
                    bqfmt: ''
                }
            ],
            latexPost: '\\end{document}',
            type: 0,
            id: 1388596687391,
            css,
            mod: 1435645658
        }
    };
  
    const decks = {
        1: {
            desc: '',
            name: 'Default',
            extendRev: 50,
            usn: 0,
            collapsed: false,
            newToday: [0, 0],
            timeToday: [0, 0],
            dyn: 0,
            extendNew: 10,
            conf: 1,
            revToday: [0, 0],
            lrnToday: [0, 0],
            id: 1,
            mod: 1435645724
        },
        1435588830424: {
            desc: '',
            name: 'Template',
            extendRev: 50,
            usn: -1,
            collapsed: false,
            newToday: [545, 0],
            timeToday: [545, 0],
            dyn: 0,
            extendNew: 10,
            conf: 1,
            revToday: [545, 0],
            lrnToday: [545, 0],
            id: 1435588830424,
            mod: 1435588830
        }
    };
  
    const dconf = {
        1: {
            name: 'Default',
            replayq: true,
            lapse: {
                leechFails: 8,
                minInt: 1,
                delays: [10],
                leechAction: 0,
                mult: 0
            },
            rev: {
                perDay: 100,
                fuzz: 0.05,
                ivlFct: 1,
                maxIvl: 36500,
                ease4: 1.3,
                bury: true,
                minSpace: 1
            },
            timer: 0,
            maxTaken: 60,
            usn: 0,
            new: {
                perDay: 20,
                delays: [1, 10],
                separate: true,
                ints: [1, 4, 7],
                initialFactor: 2500,
                bury: true,
                order: 1
            },
            mod: 0,
            id: 1,
            autoplay: true
        }
    };
  
    return `
      PRAGMA foreign_keys=OFF;
      BEGIN TRANSACTION;
      CREATE TABLE col (
          id              integer primary key,
          crt             integer not null,
          mod             integer not null,
          scm             integer not null,
          ver             integer not null,
          dty             integer not null,
          usn             integer not null,
          ls              integer not null,
          conf            text not null,
          models          text not null,
          decks           text not null,
          dconf           text not null,
          tags            text not null
      );
      INSERT INTO "col" VALUES(
        1,
        1388548800,
        1435645724219,
        1435645724215,
        11,
        0,
        0,
        0,
        '${JSON.stringify(conf)}',
        '${JSON.stringify(models)}',
        '${JSON.stringify(decks)}',
        '${JSON.stringify(dconf)}',
        '{}'
      );
      CREATE TABLE notes (
          id              integer primary key,   /* 0 */
          guid            text not null,         /* 1 */
          mid             integer not null,      /* 2 */
          mod             integer not null,      /* 3 */
          usn             integer not null,      /* 4 */
          tags            text not null,         /* 5 */
          flds            text not null,         /* 6 */
          sfld            integer not null,      /* 7 */
          csum            integer not null,      /* 8 */
          flags           integer not null,      /* 9 */
          data            text not null          /* 10 */
      );
      CREATE TABLE cards (
          id              integer primary key,   /* 0 */
          nid             integer not null,      /* 1 */
          did             integer not null,      /* 2 */
          ord             integer not null,      /* 3 */
          mod             integer not null,      /* 4 */
          usn             integer not null,      /* 5 */
          type            integer not null,      /* 6 */
          queue           integer not null,      /* 7 */
          due             integer not null,      /* 8 */
          ivl             integer not null,      /* 9 */
          factor          integer not null,      /* 10 */
          reps            integer not null,      /* 11 */
          lapses          integer not null,      /* 12 */
          left            integer not null,      /* 13 */
          odue            integer not null,      /* 14 */
          odid            integer not null,      /* 15 */
          flags           integer not null,      /* 16 */
          data            text not null          /* 17 */
      );
      CREATE TABLE revlog (
          id              integer primary key,
          cid             integer not null,
          usn             integer not null,
          ease            integer not null,
          ivl             integer not null,
          lastIvl         integer not null,
          factor          integer not null,
          time            integer not null,
          type            integer not null
      );
      CREATE TABLE graves (
          usn             integer not null,
          oid             integer not null,
          type            integer not null
      );
      ANALYZE sqlite_master;
      INSERT INTO "sqlite_stat1" VALUES('col',NULL,'1');
      CREATE INDEX ix_notes_usn on notes (usn);
      CREATE INDEX ix_cards_usn on cards (usn);
      CREATE INDEX ix_revlog_usn on revlog (usn);
      CREATE INDEX ix_cards_nid on cards (nid);
      CREATE INDEX ix_cards_sched on cards (did, queue, due);
      CREATE INDEX ix_revlog_cid on revlog (cid);
      CREATE INDEX ix_notes_csum on notes (csum);
      COMMIT;
    `;
  }
  
  window.Exporter = class {
    constructor(deckName, { template }) {
        console.log(deckName)
        this.db = new SQL.Database();
        this.db.run(template);
  
        const now = Date.now();
        const topDeckId = this._getId('cards', 'did', now);
        const topModelId = this._getId('notes', 'mid', now);
  
        this.deckName = deckName;
        this.zip = new JSZip();
        this.media = [];
        this.topDeckId = topDeckId;
        this.topModelId = topModelId;
        this.separator = '\u001F';
  
        const decks = this._getInitialRowValue('col', 'decks');
        const deck = getLastItem(decks);
        deck.name = this.deckName;
        deck.id = topDeckId;
        decks[topDeckId + ''] = deck;
        this._update('update col set decks=:decks where id=1', { ':decks': JSON.stringify(decks) });
  
        const models = this._getInitialRowValue('col', 'models');
        const model = getLastItem(models);
        model.name = this.deckName;
        model.did = this.topDeckId;
        model.id = topModelId;
        models[`${topModelId}`] = model;
        this._update('update col set models=:models where id=1', { ':models': JSON.stringify(models) });
    }
  
    save(options) {
        const { zip, db, media } = this;
        const binaryArray = db.export();
        const mediaObj = media.reduce((prev, curr, idx) => {
            prev[idx] = curr.filename;
            return prev;
        }, {});
  
        zip.file('collection.anki2', binaryArray);
        zip.file('media', JSON.stringify(mediaObj));
  
        media.forEach((item, i) => zip.file(i, item.data));
  
        return zip.generateAsync(Object.assign({}, { type: 'blob' }, options));
    }
  
    addMedia(filename, data) {
        this.media.push({ filename, data });
    }
  
    addCard(front, back, { tags } = {}) {
        const { topDeckId, topModelId, separator } = this;
        const now = Date.now();
        const note_guid = this._getNoteGuid(topDeckId, front, back);
        const note_id = this._getNoteId(note_guid, now);
  
        let strTags = '';
        if (typeof tags === 'string') {
            strTags = tags;
        } else if (Array.isArray(tags)) {
            strTags = this._tagsToStr(tags);
        }
  
        this._update('insert or replace into notes values(:id,:guid,:mid,:mod,:usn,:tags,:flds,:sfld,:csum,:flags,:data)', {
            ':id': note_id, // integer primary key,
            ':guid': note_guid, // text not null,
            ':mid': topModelId, // integer not null,
            ':mod': this._getId('notes', 'mod', now), // integer not null,
            ':usn': -1, // integer not null,
            ':tags': strTags, // text not null,
            ':flds': front + separator + back, // text not null,
            ':sfld': front, // integer not null,
            ':csum': this._checksum(front + separator + back), //integer not null,
            ':flags': 0, // integer not null,
            ':data': '' // text not null,
        });
  
        return this._update(
            'insert or replace into cards values(:id,:nid,:did,:ord,:mod,:usn,:type,:queue,:due,:ivl,:factor,:reps,:lapses,:left,:odue,:odid,:flags,:data)',
            {
                ':id': this._getCardId(note_id, now), // integer primary key,
                ':nid': note_id, // integer not null,
                ':did': topDeckId, // integer not null,
                ':ord': 0, // integer not null,
                ':mod': this._getId('cards', 'mod', now), // integer not null,
                ':usn': -1, // integer not null,
                ':type': 0, // integer not null,
                ':queue': 0, // integer not null,
                ':due': 179, // integer not null,
                ':ivl': 0, // integer not null,
                ':factor': 0, // integer not null,
                ':reps': 0, // integer not null,
                ':lapses': 0, // integer not null,
                ':left': 0, // integer not null,
                ':odue': 0, // integer not null,
                ':odid': 0, // integer not null,
                ':flags': 0, // integer not null,
                ':data': '' // text not null
            }
        );
    }
  
    _update(query, obj) {
        this.db.prepare(query).getAsObject(obj);
    }
  
    _getInitialRowValue(table, column = 'id') {
        const query = `select ${column} from ${table}`;
        return this._getFirstVal(query);
    }
  
    _checksum(str) {
        return parseInt(sha1(str).substr(0, 8), 16);
    }
  
    _getFirstVal(query) {
        return JSON.parse(this.db.exec(query)[0].values[0]);
    }
  
    _tagsToStr(tags = []) {
        return ' ' + tags.map(tag => tag.replace(/ /g, '_')).join(' ') + ' ';
    }
  
    _getId(table, col, ts) {
        const query = `SELECT ${col} from ${table} WHERE ${col} >= :ts ORDER BY ${col} DESC LIMIT 1`;
        const rowObj = this.db.prepare(query).getAsObject({ ':ts': ts });
  
        return rowObj[col] ? +rowObj[col] + 1 : ts;
    }
  
    _getNoteId(guid, ts) {
        const query = `SELECT id from notes WHERE guid = :guid ORDER BY id DESC LIMIT 1`;
        const rowObj = this.db.prepare(query).getAsObject({ ':guid': guid });
  
        return rowObj.id || this._getId('notes', 'id', ts);
    }
  
    _getNoteGuid(topDeckId, front, back) {
        return sha1(`${topDeckId}${front}${back}`);
    }
  
    _getCardId(note_id, ts) {
        const query = `SELECT id from cards WHERE nid = :note_id ORDER BY id DESC LIMIT 1`;
        const rowObj = this.db.prepare(query).getAsObject({ ':note_id': note_id });
  
        return rowObj.id || this._getId('cards', 'id', ts);
    }
  }
  
  
  
  window.apkgExport = function (deckName, template) {
    return new window.Exporter(deckName, {
        template: createTemplate(template)
    });
  }