import { ImageSource, Sound, Resource, Loader } from 'excalibur'

const Resources = {
    Scout: new ImageSource('images/Scout.png'),
    Minigunner: new ImageSource('images/Minigunner.png'),
    Sniper: new ImageSource('images/Sniper.png'),
    Turret: new ImageSource('images/Turret.png'),
    Starburst: new ImageSource('images/Starburst.png'),
    BG: new ImageSource('images/bg.png'),
    BasicEnemy: new ImageSource('images/basicEnemy.png'),
    Bullet: new ImageSource('images/Bullet.png'),
    Towerlocation: new ImageSource('images/towerLocation.png'),
    SwitchArrows: new ImageSource('images/switch_arrows.png'),

}

const resourceArray = []
for (const key in Resources) {
    resourceArray.push(Resources[key])
}

const ResourceLoader = new Loader(resourceArray)

export { Resources, ResourceLoader }